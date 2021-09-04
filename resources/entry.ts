import qs from "qs";
import useSWR, { mutate } from "swr";
import RRule from "rrule";

import supabase from "./supabase";

interface Thumbnail {
  src: string;
  height: number;
  width: number;
}

interface Entry {
  id: UUID;
  duration: number;
  title: string;
  thumbnail: Thumbnail;
  src: string;
  profile_id: UUID;
}

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
  return mutate(["entries", profileId], (entries: Entry[]) => {
    return [...entries, data[0]];
  });
};

export const updateEntry = async (id: UUID, values: any) => {
  const { data, error } = await supabase.from("entry").update(values).match({ id });
  console.log("data");
  if (error) {
    throw error;
  }
  const first = data[0];
  const profileId = first.profile_id;
  return mutate(["entries", profileId], (entries: Entry[]) => {
    return entries.map((entry: Entry) => {
      if (entry.id === id) {
        return first;
      }
      return entry;
    });
  });
};

export const deleteEntry = async (id: UUID, profileId: UUID) => {
  const { data, error } = await supabase.from("entry").delete().match({ id });
  if (error) {
    throw error;
  }
  return mutate(["entries", profileId], (entries: Entry[]) => {
    return entries.filter((entry: Entry) => entry.id !== id);
  });
};

async function fetchByUserId(key: string, profileId: UUID) {
  const { data, error } = await supabase.from("entry").select().match({ profile_id: profileId });
  if (error) {
    throw error;
  }
  return data.sort(({ rrule: first }, { rrule: second }) => {
    const a = RRule.fromString(first);
    const z = RRule.fromString(second);
    return a.getSortValue() - z.getSortValue();
  });
}

export const useEntries = (profileId: UUID) => {
  return useSWR(profileId ? ["entries", profileId] : null, fetchByUserId);
};

async function fetchByUsername(key: string, username: string) {
  const { data, error } = await supabase.from("profiles").select().match({ username });
  if (error) {
    throw error;
  }
  return fetchByUserId(key, data[0].id);
}
export const useEntriesFromUsername = (username: string | undefined) => {
  return useSWR(username ? ["entries", username] : null, fetchByUsername);
};
