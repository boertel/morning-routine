import useSWR, { mutate } from "swr";
import qs from "qs";
import axios from "axios";

export function deleteItem(pk) {
  axios.delete(`/api/entry/${pk}`);
  mutate(
    "/api/entry",
    (items) => {
      const data = { ...items };
      delete data[pk];
      return data;
    },
    false
  );
}

const afterMutate = (pk, values) => async (items) => {
  if (items) {
    const previous = items[pk] || {};
    const data = {
      ...items,
      [pk]: {
        ...previous,
        ...values,
      },
    };
    return data;
  }
};

export async function updateItem(pk, values) {
  axios.put(`/api/entry/${pk}`, { ...values, id: pk });
  return mutate("/api/entry", afterMutate(pk, values), false);
}

export async function addItem(videoId) {
  const src = `https://www.youtube.com/watch?v=${videoId}`;
  const params = qs.stringify({
    format: "json",
    url: src,
  });
  const oembed = `https://www.youtube.com/oembed?${params}`;
  const { data: preview } = await axios.get(oembed);

  const data = {
    title: preview.title,
    provider: "youtube",
    kind: preview.type,
    duration: 0,
    src,
    thumbnail: {
      src: preview.thumbnail_url,
      height: preview.thumbnail_height,
      width: preview.thumbnail_width,
    },
    days: [],
  };

  const { data: entry } = await axios.post("/api/entry", data);
  return mutate("/api/entry", afterMutate(entry.id, entry), false);
}

async function fetcher() {
  const { data } = await axios.get("/api/entry");
  return data;
}

export function useEntries(options) {
  const { data = [], ...etc } = useSWR("/api/entry", fetcher, options);
  return { data, ...etc };
}
