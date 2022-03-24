export const computeStyle = function (iconSize: number) {
  const style = {
    size: iconSize,
    margin: iconSize / 10,
    padding: iconSize / 10,
    titleHeight: iconSize / 2,
    titleFontSize: (iconSize / 2) * (3 / 8), // 字体大小为标题高度的 3/8，在图标为 64px 的情况下，刚好获得 12px 的字号
  };

  const scrollerStyle = {
    gridTemplateColumns: `repeat(auto-fill, ${
      style.size + style.margin * 2 + style.padding * 2
    }px)`,
    gridTemplateRows: `repeat(auto-fill, ${
      style.size + style.margin * 2 + style.padding * 2 + style.titleHeight
    }px)`,
    gridColumnGap: `${style.margin}px`,
    gridRowGap: `${style.margin}px`,
  };

  const linkStyle = {
    width: style.size + style.padding * 2, // padding-left/padding-right 集成到 width 中
    height: style.size + style.titleHeight,
    paddingTop: style.padding,
    paddingBottom: style.padding,
  };

  const iconStyle = {
    width: style.size,
    height: style.size,
  };

  const titleStyle = {
    width: style.size + style.padding, // 只加一个 padding，另一个 padding 留一点边距好看一些
    height: style.titleHeight,
    lineHeight: `${style.titleHeight}px`,
    fontSize: style.titleFontSize,
  };

  return {
    scrollerStyle,
    linkStyle,
    iconStyle,
    titleStyle,
  };
};
