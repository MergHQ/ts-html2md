import { Parse } from './html2md'

// Hover over Out to see result of parser
type Out = Parse<`<h1>Hello world</h1>
<p>This is a test</p>
<h2><i>Italic H2 header</i></h2>
<b>Bold stuff</b>`>
