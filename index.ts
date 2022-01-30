import { Parse } from './html2md'

// Hover over Out to see result of parser
type Out = Parse<`<h1>Hello world</h1>
<p>This is a test <b>Bold</b></p>
<img src="https://i.imgur.com/Yk5aZxj.jpeg" alt="student loans"></img>
<a href="https://google.com">Go to google</a>
<b>Bold stuff</b>`>
