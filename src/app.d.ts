import type { Session, AuthChangeEvent } from "@supabase/supabase-js";

declare global {
	namespace App {
		interface Locals {
			checkAuth: false | Session
			warning: string
		}
	}
}

export {};