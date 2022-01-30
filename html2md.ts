type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'b' | 'i' | 'img' | 'a'

type ImgTagToMd<Attribs extends string> =
  Attribs extends `src="${infer Src}" alt="${infer Alt}"`
    ? Src extends string
      ? Alt extends string
        ? `![${Alt}](${Src})`
        : never
      : never
    : never

type AToMd<
  Attribs extends string,
  Content extends string
> = Attribs extends `href="${infer Href}"`
  ? Href extends string
    ? `[${Content}](${Href})`
    : never
  : never

type HTMLTagToMd<
  T extends Tag,
  Content extends string,
  Attribs extends string
> = T extends 'h1'
  ? `# ${Content}`
  : T extends 'h2'
  ? `## ${Content}`
  : T extends 'h3'
  ? `### ${Content}`
  : T extends 'p'
  ? `${Content}`
  : T extends 'b'
  ? `**${Content}**`
  : T extends 'i'
  ? `___${Content}___`
  : T extends 'img'
  ? ImgTagToMd<Attribs>
  : T extends 'a'
  ? AToMd<Attribs, Content>
  : never

type HTMLNode<T extends string> = T extends `${infer Head}<${
  | `${infer OpenTag} ${infer Attribs}`
  | `${infer OpenTag}`}>${infer Rest}`
  ? Rest extends `${infer InnerContent}</${OpenTag}>${infer Tail}`
    ? OpenTag extends Tag
      ? `${Head extends '' ? '' : HTMLNode<Head>}${HTMLTagToMd<
          OpenTag,
          HTMLNode<InnerContent>,
          Attribs
        >}${Tail extends '' ? '' : HTMLNode<Tail>}`
      : never
    : never
  : `${T}`

type Join<Items> = Items extends [infer FirstItem, ...infer Rest]
  ? FirstItem extends string
    ? Rest extends string[]
      ? `${FirstItem}\n${Join<Rest>}`
      : FirstItem
    : never
  : Items extends string
  ? Items
  : '\n'

type Split<
  Str,
  Delim extends string
> = Str extends `${infer Head}${Delim}${infer Rest}`
  ? [Head, ...Split<Rest, Delim>]
  : Str extends string
  ? Str extends ''
    ? never
    : [Str]
  : never

type MapToMarkdown<Items> = Items extends [infer FirstItem, ...infer Rest]
  ? FirstItem extends string
    ? Rest extends string[]
      ? [HTMLNode<FirstItem>, ...MapToMarkdown<Rest>]
      : FirstItem
    : never
  : Items extends string
  ? Items
  : []

export type Parse<Input extends string> = Join<MapToMarkdown<Split<Input, '\n'>>>
