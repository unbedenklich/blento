# Custom Cards

WORK IN PROGRESS, EARLY STATE, MIGHT CHANGE.

see `src/lib/cards` for how cards are made.

Current card definition:

```ts
export type CardDefinition = {
	type: string;
	contentComponent: Component<ContentComponentProps>; // this is what your card shows

	editingContentComponent?: Component<ContentComponentProps>; // if this is not given, defaults to showing contentComponent in edit mode too
	creationModalComponent?: Component<CreationModalComponentProps>; // if this is not given will just add a card

	createNew?: (item: Item) => void; // this is run before the card is added, set some settings here

	sidebarComponent?: Component<SidebarComponentProps>; // this is the button that will be shown in the sidebar to add your card
};
```
