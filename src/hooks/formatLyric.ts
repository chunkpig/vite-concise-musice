/**

* 格式化歌词字符串为"时间-歌词"格式的数组

* @param lyric 歌词字符串

* @returns

*/

function formatLyric(lyric: string) {
  const lyricParts = lyric.split('\n').filter(item => item)

  return lyricParts.map(item => {
    const splitItems = item.split(']')
    const lyricItem: any = {
      time: splitItems[0].slice(1, 6),
      // time: splitItems[0].slice(1),
      text: splitItems[1]
    }

    return lyricItem
  })
}
export default formatLyric
