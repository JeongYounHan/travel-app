export default function({ store, redirect }) {
    if (!store.state.users.token) {
        redirect('/login');
    }
}