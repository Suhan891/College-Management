import { create } from "zustand";
import { devtools } from 'zustand/middleware';

export const useCollege = create(
    devtools(
        (set, get) => ({
            courses: [],
            streams: [],
            departments: [],
            teachers: [],
            class: [],


            setCourses: (courses) => set({courses}),
            setStreams: (streams) => set({streams}),

        //           addTodo: (todo) =>
        // set((state) => ({
        //   todos: [todo, ...state.todos],
        // })),
            addCourse: (course) => 
                set((state) => ({
                    courses: [course,...state.courses]
                }))
        }),
        {
            name: "college-store"
        }
    )
)