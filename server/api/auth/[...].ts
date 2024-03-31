import CredentialProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    pages: {
        signIn: '/signIn'
    },
    providers: [
        CredentialProvider.default({
            id: '',
            name: 'credentials',
            credentials: {},
            // eslint-disable-next-line require-await
            async authorize () {
                // TODO
                return null
            }
        })
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {
        // eslint-disable-next-line require-await
        async jwt ({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    ...user
                }
            }

            return token
        },

        // eslint-disable-next-line require-await
        async session ({ token, session }) {
            session.user = {
                ...token,
                ...session.user
            }
            return session
        }
    }
})
