export default defineEventHandler((event) => {
    const { pathname } = getRequestURL(event)
    console.log('Request, path:', pathname)
})
