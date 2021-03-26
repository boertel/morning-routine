import useSWR, { mutate } from "swr";
import qs from "qs";

const resources = [
  /*
  {
    type: "video",
    name: "Abs workout",
    src: "//www.youtube-nocookie.com/embed/W-9L0J_9qag",
    duration: 480,
    rrule: "RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR",
  },
  {
    type: "video",
    name: "Sunrise Yoga | Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/r7xsYgTeM2Q",
    duration: 933,
    rrule: "RRULE:FREQ=WEEKLY;BYDAY=TU",
  },
  {
    type: "video",
    name: "Yoga For Upper Body Strength | Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/7agiIk9KgyI",
    duration: 786,
  },
  {
    type: "video",
    name: "Yoga For Runners - Physical & Mental Stamina | Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/plL13JF5BHA",
    duration: 1219,
  },
  {
    type: "video",
    name: "Take 5 Yoga Break! | Yoga Quickies | Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/nQFf38xeBww",
    duration: 363,
  },
  {
    type: "video",
    name: "Office Break Yoga | 14 Min. Yoga Practice | Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/M-8FvC3GD8c",
    duration: 859,
    rrule: "RRULE:FREQ=WEEKLY;BYDAY=TH",
  },
  {
    type: "video",
    name: "Wind Down Yoga - 12 Minute Bedtime Yoga - Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/BiWDsfZ3zbo",
    duration: 723,
  },
  {
    type: "video",
    name: "Wake Up Yoga - 11 Minute Morning Yoga Practice - Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/UEEsdXn8oG8",
    duration: 693,
  },
  {
    type: "video",
    name: "Yoga For Neck, Shoulders, Upper Back - 10 Minute Yoga Quickie - Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/X3-gKPNyrTA",
    duration: 637,
  },
  {
    type: "video",
    name: "Yoga For Text Neck | Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/JUP_YdYyfQw",
    duration: 1725,
  },
  {
    type: "video",
    name: "Yoga for Neck and Shoulder Relief - Yoga With Adriene",
    src: "//www.youtube-nocookie.com/embed/SedzswEwpPw",
    duration: 1057,
  },
  */
];

function fetcher() {
  const items = JSON.parse(localStorage.getItem("items") || "{}");
  for (const key in items) {
    items[key].day = items[key].day.map((d) => parseInt(d, 10));
  }
  localStorage.setItems("items", JSON.stringify(items));
  return Promise.resolve(items);
}

export function deleteItem(pk) {
  mutate("items", async (items) => {
    const data = { ...items };
    delete data[pk];
    localStorage.setItem("items", JSON.stringify(data));
    return data;
  });
}

export function updateItem(pk, values) {
  return mutate("items", async (items) => {
    const previous = items[pk] || {};
    const data = {
      ...items,
      [pk]: {
        ...previous,
        ...values,
      },
    };
    localStorage.setItem("items", JSON.stringify(data));
    return data;
  });
}

export async function addItem(pk) {
  const params = qs.stringify({
    format: "json",
    url: `https://www.youtube.com/watch?v=${pk}`,
  });
  const oembed = `https://www.youtube.com/oembed?${params}`;
  const response = await fetch(oembed);
  const data = await response.json();
  return updateItem(pk, {
    title: data.title,
    type: data.type,
    duration: 0,
    thumbnail: {
      src: data.thumbnail_url,
      height: data.thumbnail_height,
      width: data.thumbnail_width,
    },
    day: [],
    src: `//www.youtube-nocookie.com/embed/${pk}`,
    pk,
  });
}

export function useItems() {
  const { data = [], ...etc } = useSWR("items", fetcher);
  return { data, ...etc };
}
