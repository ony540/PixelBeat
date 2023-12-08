// genre_artist_id_table 접근 관련 api
import { supabase, TABLE_NAME } from "@/api/supabase";

export const getArtistId = async (genres: string[]) => {
  try {
    const { data } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .in("genre", genres);
    return data;
  } catch (error) {
    console.error("Error in getArtistId:", error);
  }
};
