# chrome-plugin-example

### Clone

- $ `git clone git@github.com:johnnynode/chrome-plugin-example.git --depth 1`

### Service side

- $ `cd server`
- $ `node index`

### Chrome side

- open chrome browser 
- enter URL ：`chrome://extensions/`
- click <load unpacked> choose `src` folder or you can drag the `src.crx` or `src.pem` file into that extensions page
- plugin is installed now

### Test

- visit: `http://127.0.0.1:3000/`
- select some checkbox buttons
- click installed plugin and input your info and test
- then server side can receive the message