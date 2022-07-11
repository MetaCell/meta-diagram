# meta-diagram

A simple diagramming workspace library

## Screenshot

![image](https://user-images.githubusercontent.com/19196034/176734658-6019f1f7-b268-4361-9bdc-2129e1078e16.png)


## Install 

```
npm i @metacell/meta-diagram

// or if you are using yarn

yarn add @metacell/meta-diagram
```

## Usage

```javascript
const App = () => {
    const classes = useStyles();

    const node1 = new MetaNode('1', 'node1', 'default', new Position(250, 100),
        new Map(Object.entries({color: 'rgb(0,192,255)'})))

    const node2 = new MetaNode('2', 'node2', 'default', new Position(500, 100),
        new Map(Object.entries({color: 'rgb(255,192,0)'})))

    const link3 = new MetaLink('3', 'link3', 'default', '1', 'out', '2', 'in',
        new Map(Object.entries({color: 'rgb(255,192,0)'})))

    const componentsMap = new ComponentsMap(
        new Map(Object.entries({'default': CustomNodeWidget})),
        new Map(Object.entries({'default': CustomLinkWidget}))
    )

    return (
        <div className={classes.main}>
            <MetaDiagram metaNodes={[node1, node2]} metaLinks={[link3]} componentsMap={componentsMap} />
        </div>
    );
};
```

## Props

| name          | type                                                                                  | required | description                                                                                    |
|---------------|---------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------|
| metaNodes  | MetaNode[]                                                                         | true     | array of MetaNode instances to be render                                                    |
| metaLinks     | MetaLink[]                                                                            | true     | array of MetaLink instances to be render                                                       |
| componentsMap | { nodes: [key: string]: React.elementType,  links: [key: string]: React.elementType } | true     | dictionary to connect application specific types with React elements to render for those types |


## Development

### Commands

TSDX scaffolds the library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.


## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix

### Publishing to NPM

1 - Run `npm run build`

2 - Change the package version on [package.json](https://github.com/MetaCell/meta-diagram/blob/develop/package.json#L2) to the semantically adequated new value

3 - Run `npm publish --access=public`

## Built With

[react-diagrams](https://github.com/projectstorm/react-diagrams)
