export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	public: {
		Tables: {
			community_events: {
				Row: {
					created_at: string
					description: string | null
					end_time: string
					host: string
					id: number
					image: string
					location: string | null
					name: string
					start_time: string
					updated_at: string
				}
				Insert: {
					created_at?: string
					description?: string | null
					end_time: string
					host?: string
					id?: number
					image?: string
					location?: string | null
					name: string
					start_time: string
					updated_at?: string
				}
				Update: {
					created_at?: string
					description?: string | null
					end_time?: string
					host?: string
					id?: number
					image?: string
					location?: string | null
					name?: string
					start_time?: string
					updated_at?: string
				}
				Relationships: []
			}
			event_tickets: {
				Row: {
					academic_year: Database["public"]["Enums"]["academic_year"]
					created_at: string
					email: string
					event_id: number
					field_of_study: Database["public"]["Enums"]["field_of_study"]
					id: string
					major: string
					name: string
					participate: boolean
					updated_at: string
				}
				Insert: {
					academic_year: Database["public"]["Enums"]["academic_year"]
					created_at?: string
					email: string
					event_id: number
					field_of_study: Database["public"]["Enums"]["field_of_study"]
					id?: string
					major: string
					name: string
					participate?: boolean
					updated_at?: string
				}
				Update: {
					academic_year?: Database["public"]["Enums"]["academic_year"]
					created_at?: string
					email?: string
					event_id?: number
					field_of_study?: Database["public"]["Enums"]["field_of_study"]
					id?: string
					major?: string
					name?: string
					participate?: boolean
					updated_at?: string
				}
				Relationships: [
					{
						foreignKeyName: "event_tickets_event_id_fkey"
						columns: ["event_id"]
						isOneToOne: false
						referencedRelation: "community_events"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "event_tickets_event_id_fkey"
						columns: ["event_id"]
						isOneToOne: false
						referencedRelation: "upcoming_events"
						referencedColumns: ["id"]
					},
				]
			}
		}
		Views: {
			upcoming_events: {
				Row: {
					created_at: string | null
					description: string | null
					end_time: string | null
					host: string | null
					id: number | null
					image: string | null
					location: string | null
					name: string | null
					start_time: string | null
					updated_at: string | null
				}
				Insert: {
					created_at?: string | null
					description?: string | null
					end_time?: string | null
					host?: string | null
					id?: number | null
					image?: string | null
					location?: string | null
					name?: string | null
					start_time?: string | null
					updated_at?: string | null
				}
				Update: {
					created_at?: string | null
					description?: string | null
					end_time?: string | null
					host?: string | null
					id?: number | null
					image?: string | null
					location?: string | null
					name?: string | null
					start_time?: string | null
					updated_at?: string | null
				}
				Relationships: []
			}
		}
		Functions: {
			create_event_ticket: {
				Args:
				| {
					p_event_id: number
					p_name: string
					p_email: string
					p_academic_year: Database["public"]["Enums"]["academic_year"]
					p_field_of_study: Database["public"]["Enums"]["field_of_study"]
					p_major: string
				}
				| {
					p_event_id: number
					p_name: string
					p_email: string
					p_academic_year: Database["public"]["Enums"]["academic_year"]
					p_field_of_study: Database["public"]["Enums"]["field_of_study"]
					p_major: string
					p_participate?: boolean
				}
				Returns: string
			}
		}
		Enums: {
			academic_year: "Freshman" | "Sophomore" | "Junior" | "Senior"
			field_of_study: "business" | "comp-sci" | "mediacom"
			major: "DS" | "SD" | "AI" | "IoT" | "CyS"
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
	DefaultSchemaTableNameOrOptions extends
	| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
	| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database
	}
	? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
		Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
	: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
		Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R
		}
	? R
	: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
		DefaultSchema["Views"])
	? (DefaultSchema["Tables"] &
		DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
			Row: infer R
		}
	? R
	: never
	: never

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
	| keyof DefaultSchema["Tables"]
	| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database
	}
	? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
	: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
		Insert: infer I
	}
	? I
	: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
	? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
		Insert: infer I
	}
	? I
	: never
	: never

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
	| keyof DefaultSchema["Tables"]
	| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database
	}
	? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
	: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
		Update: infer U
	}
	? U
	: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
	? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
		Update: infer U
	}
	? U
	: never
	: never

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
	| keyof DefaultSchema["Enums"]
	| { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database
	}
	? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
	: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
	? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
	: never

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
	| keyof DefaultSchema["CompositeTypes"]
	| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database
	}
	? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
	: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
	? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
	: never

export const Constants = {
	public: {
		Enums: {
			academic_year: ["Freshman", "Sophomore", "Junior", "Senior"],
			field_of_study: ["business", "comp-sci", "mediacom"],
			major: ["DS", "SD", "AI", "IoT", "CyS"],
		},
	},
} as const
