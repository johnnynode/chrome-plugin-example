# chrome-plugin-example

### Clone

- $ `git clone git@github.com:johnnynode/chrome-plugin-example.git --depth 1`

### Server side

- $ `cd server`
- $ `node index`

### Chrome side

- open chrome browser 
- enter URL ：`chrome://extensions/`
- click `load unpacked` tab and choose `src` folder or you can drag the `src.crx` file into that extensions page
- plugin would be installed

### Test

- visit: `http://127.0.0.1:3000/`
- select some checkbox buttons
- click the installed plugin, input your info and click the blue `Send` button
- then server side can receive the message

### Blog

- [blog@csdn](https://blog.csdn.net/tyro_java/article/details/79844607)

### Remarks

- view the code, you will understand it

### License

MIT &copy; [johnnynode](http://github.com/johnnynode)