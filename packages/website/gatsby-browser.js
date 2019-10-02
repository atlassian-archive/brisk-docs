const React = require("react")
const Layout = require("./pages/_app.tsx").default

exports.wrapRootElement = ({ element }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout>{element}</Layout>
}