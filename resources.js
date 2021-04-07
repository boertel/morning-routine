import useSWR, { mutate } from "swr";
import qs from "qs";

const resources = [];

function fetcher() {
  const items = JSON.parse(localStorage.getItem("items") || "{}");
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
    if (items) {
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
    }
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
