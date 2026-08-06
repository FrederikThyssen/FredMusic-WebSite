export type QuoteRequestStatus = "pending" | "accepted" | "refused";
export type MusicRequestStatus = "pending" | "accepted" | "played" | "refused";

export type Database = {
  public: {
    Tables: {
      quote_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          event_type: string;
          event_date: string | null;
          location: string | null;
          guests_count: number | null;
          message: string | null;
          status: QuoteRequestStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          event_type: string;
          event_date?: string | null;
          location?: string | null;
          guests_count?: number | null;
          message?: string | null;
          status?: QuoteRequestStatus;
          created_at?: string;
        };
        Update: {
          status?: QuoteRequestStatus;
        };
        Relationships: [];
      };
      music_requests: {
        Row: {
          id: string;
          event_id: string | null;
          guest_name: string | null;
          artist: string;
          song_title: string;
          message: string | null;
          status: MusicRequestStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id?: string | null;
          guest_name?: string | null;
          artist: string;
          song_title: string;
          message?: string | null;
          status?: MusicRequestStatus;
          created_at?: string;
        };
        Update: {
          status?: MusicRequestStatus;
        };
        Relationships: [];
      };
      active_events: {
        Row: {
          id: string;
          name: string;
          is_active: boolean;
          created_at: string;
          archived_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          is_active?: boolean;
          created_at?: string;
          archived_at?: string | null;
        };
        Update: {
          name?: string;
          is_active?: boolean;
          archived_at?: string | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          key: string;
          value: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: string | null;
          updated_at?: string;
        };
        Update: {
          value?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      activate_event: {
        Args: { p_event_id: string };
        Returns: null;
      };
    };
    Enums: Record<string, never>;
  };
};
