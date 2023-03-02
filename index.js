import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from  "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

const firebaseConfig = {
	apiKey: "AIzaSyDT8aNLH6OZwgA5kmucAdXdP5t263wZmxo",
	authDomain: "gamess-39722.firebaseapp.com",
	projectId: "gamess-39722",
	storageBucket: "gamess-39722.appspot.com",
	messagingSenderId: "704204310297",
	appId: "1:704204310297:web:59511fd282a43880a46788",
	measurementId: "G-CYLE3T1W8J"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const collectionGames = collection(db, 'games')

const formAddGame = document.querySelector('[data-js="add-game-form"]')

getDocs(collectionGames)
	.then(querySnap => {
		const gamesLis = querySnap.docs.reduce((acc, doc) => {
			const { title, developedBy, createdAt } = doc.data()

			acc += `<li class="my-4">
			<h5>${title}</h5>

				<ul>
					<li>Desenvolvidor por ${developedBy}</li>
					<li>Adicionado no banco em ${createdAt.toDate()}</li>
				</ul>
			</li>`

			return acc
		}, '')
		
		const gamesList = document.querySelector('[data-js="games-list"]')
		gamesList.innerHTML = gamesLis
	})
	.catch(console.log)

formAddGame.addEventListener('submit', e => {
	e.preventDefault()

	addDoc(collectionGames, {
		title: e.target.title.value,
		developedBy: e.target.developer.value,
		createdAt: serverTimestamp()
	}).then(doc => console.log('Document criado com o id', doc.id))
	.catch(console.log)
})
