import type { Session } from "@supabase/supabase-js";
import {writable} from "svelte/store";
import type { MoviesDataTypes, NavSelection } from "./types";


export const statics = writable({
    //navigation
    session:<Session | undefined> {},
    activeItem: "",
    defaultNav:<NavSelection[]> [],
    noAuthNav: [
        {
            name: "Home",
            url: "/"
        },

        {
            name: "Book Now",
            url: "/Book-Now"
        },

        {
            name: "Login",
            url: "/Login"
        },
    ],

    hasAuthNav: [
        {
            name: "Home",
            url: "/"
        },

        {
            name: "Book Now",
            url: "/Book-Now"
        },
    ],

    //book now
    moviesArray:<MoviesDataTypes[]> [],

})