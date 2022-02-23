## Upload
> axios data param is `FormData`, browser will set `Content-Type: multipart/form-data` automatically


* proxy tools: [proxyman](https://proxyman.io/)
* [how to see form data with enctype = "multipart/form-data" in chrome debugger](https://stackoverflow.com/questions/55743964/how-to-see-form-data-with-enctype-multipart-form-data-in-chrome-debugger)

### confuse

* can not test css effect ?
  * `display: none`

### Vue3 demo

```js
const file = {a:1}
const uploadedFiles = new Proxy(file,{
    get(target,key) {
        console.log('get')
        return Reflect.get(target,key)
    },
    set(target,key,value) {
        console.log('set')
        return Reflect.set(target,key,value)
    }
})
// chnage origin object not trigger get/set meethod
file.a = 2
uploadedFiles.a = 3
```

vue code:
```js
const file = reactive({a:1})
const uploadedFiles = ref([])
uploadedFiles.value[0] = file
// chnage origin object not trigger get/set meethod
file.a = 2
uploadedFiles.a = 3
```
