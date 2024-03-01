import { Component } from "react";
import { create } from "zustand";
import { GenerateUniqueID } from "@/utils/IdHelper";

type FactoryStore = {
    components: SnComponent[];
    AddComponent: (name: string, type: string, props: any) => SnComponent;
    RemoveComponent: (id: string) => void;
    GetComponent: (id: string) => SnComponent | undefined;
    SaveAllComponents: () => void;
    LoadAllComponents: () => void;
    UpdateComponent: (id: string, props: any) => void;
    ClearAllComponents: () => void;
};

const useFactory = create<FactoryStore>((set, get) => ({
    components: [],
    
    AddComponent: (name: string, type: string, props: any) => {
        const component = {
        id: GenerateUniqueID().toString(),
        name: name,
        type: type,
        props: props
        }
        set(() => ({ components: [...get().components, component] }));

        return component;
    },
    RemoveComponent: (id: string) => {
        set(() => ({ components: get().components.filter((component) => component.id !== id) }));
    },
    GetComponent: (id: string) => {
        return get().components.find((component) => component.id === id);
    },
    UpdateComponent: (id: string, props: any) => {
        set(() => ({
            components: get().components.map((component) => {
                if (component.id === id) {
                    return { ...component, props: { ...component.props, ...props } };
                }
                return component;
            }),
        }));
    },
    SaveAllComponents: () => {
        // save all components to local storage
        localStorage.setItem("components", JSON.stringify(get().components));
    },
    LoadAllComponents: () => {
        // load all components from local storage
        const components = localStorage.getItem("components");
        if (components) {
            set(() => ({ components: JSON.parse(components) }));
        }
    },
    ClearAllComponents: () => {
        set(() => ({ components: [] }));
    },
}));


export default useFactory;