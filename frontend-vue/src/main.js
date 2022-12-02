import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')


// const app = Vue.createApp({
//     data() {
//         return {
//             url: 'https://example.com',
//             showChangeTitle: true,
//             books: [
//                 {title: 'The return of the pokemon', author: 'Ash Ketchum', img: 'src/assets/pikachu.png', isFav: true }, 
//                 {title: 'Pokemon 4ever', author: 'Ash Ketchum', img: 'src/assets/pikachu_dmax.png', isFav: false }, 
//                 {title: 'Pokemon Heroes', author: 'Junichi Masuda', img: 'src/assets/pkmn_heroes.jpg', isFav: true }, 
//             ],
//             x: 0,
//             y: 0,
//         }
//       }, 
//       methods: {
//         changeTitle(title) {
//             this.title = title
//         },

//         toggleTitle() {
//             this.showChangeTitle = !this.showChangeTitle
//         },

//         handleEvent(e) {
//             console.log(e, e.type)
//         },

//         handleMouseMove(e) {
//             this.x = e.offsetX
//             this.y = e.offsetY
//         },

//         toggleFav(book) {
//             book.isFav = !book.isFav
//         }
//       },
//       computed: {
//         filteredBooks() {
//             return this.books.filter((book) => book.isFav)
//         }
//       }
// })

// app.mount('#app')