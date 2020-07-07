import '../styles/global.css'

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <footer>
      <abbr title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.">
        CC BY-NC 4.0
      </abbr>
      {` ${new Date().getFullYear()} © Shu Ding.`}
    </footer>
  </>
)
