# JBModal

a react component modal that open in the center of your page
the width and height of the modal depends on the width and the height of its content

## installation 

```command
    npm i jb-modal-react
```

in your jsx file

```js
    import JBModal from 'jb-modal-react'
```
``` jsx
    <JBModal></JBModal>
```

## use

you can place your modal content in ` <JBModal></JBModal>` like:
```jsx
    <JBModal>
        <div>
            <p>this is the modal content<p>
        </div>
    </JBModal>
 ```

 ### props
- onClose
you can pass a function to onClose props so that when a user click outside of the modal, the modal closes.

``` jsx
    const [isOpen, setIsOpen] = useState(false);
    <JBModal onClose={() => setIsOpen(false)}></JBModal>

```

- isOpen
you can pass true or false to this props,this way the modal will be open based on the isOpen props.

``` jsx
    <JBModal isOpen={true}></JBModal>
    // the modal is open
```

- id
you can set a specific id for each one of your modals,this way when the modal is open the id of the modal will be in your url.

``` jsx
    <JBModal id={MYMODAL}></JBModal>
```

- onUrlOpen
when the react copmonent first renders the default state of isModalOpen is false.
when the url contains the id of the modal the function passed to onUrlOpen will update the react state and set the isModalOpen state to true.
example: 

```jsx
    [isModalOpen, setOpen] = useState(false);
    <JBModal onUrlOpen={() => setOpen(true)}></JBModal>
```
