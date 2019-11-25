# Quit Smoking Time Keeper

Forked from https://github.com/jakealbaugh/jake-quits, see his version at https://jakequits.com/. I modified this so I could make a version for my father who also stopped smoking and wanted to support him.

I translated it to Dutch, added progress indicators on the "health-milestones" and made the name, date of last nicotine and daily cost configurable via environment variables.

## Build your own

1. Clone this repository
2. Run `npm install`
3. Rename the `.env.sample` file to `.env`
4. Modify the variables in the `.env` file to your context
5. Run `npm start` if you want to tweak some html/css/js
6. Or run `npm run build` if you want to build a static version (you'll find it in the `dist/` folder)

Want to host it for free? Sign in at https://www.netlify.com/ and drop the dist folder to deploy your version
