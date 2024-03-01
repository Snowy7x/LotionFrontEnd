import { TextCard } from "@/components/workspace";

const RestoreComponent = (component : SnComponent) => {
    if (component == null) return;
    switch (component.type) {
        case "TextCard":
            return <TextCard id={component.id} initialX={component.props.x} initialY={component.props.y} content={component.props.content} />;
            break;
    }
}

const RenderComponents = (components : SnComponent[]) => {
    return components.map((component) => {
        return RestoreComponent(component);
    });
}

export {RestoreComponent, RenderComponents}