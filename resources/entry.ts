import qs from "qs";

import supabase from "./supabase";

export const addEntry = async (videoId: string, profileId: string) => {
  const params = qs.stringify({
    format: "json",
    url: `https://www.youtube.com/watch?v=${videoId}`,
  });
  const oembed = `https://www.youtube.com/oembed?${params}`;
  const response = await fetch(oembed);
  const json = await response.json();
  const { data, error } = await supabase.from("entry").insert({
    title: json.title,
    duration: 0,
    thumbnail: {
      src: json.thumbnail_url,
      height: json.thumbnail_height,
      width: json.thumbnail_width,
    },
    src: `//www.youtube-nocookie.com/embed/${videoId}`,
    profile_id: profileId,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const updateEntry = async (id: any, values: any) => {
  const { data, error } = await supabase.from("entry").update(values).match({ id });
  if (error) {
    throw error;
  }
  return data;
};

export const fetchEntries = async (match: any) => {
  const { data, error } = await supabase.from("entry").select().match(match);
  if (error) {
    throw error;
  }
  return data;
};
