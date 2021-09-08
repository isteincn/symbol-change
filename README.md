# change-symbol README

自动将中文符号转换为英文符号，转换表如下

``` text = text.replace(/，/g, ",");
    text = text.replace(/。/g, ".");
    text = text.replace(/《/g, "<");
    text = text.replace(/》/g, ">");
    text = text.replace(/？/g, "?");
    text = text.replace(/；/g, ";");
    text = text.replace(/：/g, ":");
    text = text.replace(/‘/g, "'");
    text = text.replace(/’/g, "'");
    text = text.replace(/“/g, "\"");
    text = text.replace(/”/g, "\"");
    text = text.replace(/！/g, "!");
    text = text.replace(/（/g, "(");
    text = text.replace(/）/g, ")");
    text = text.replace(/——/g, "_");
```

注意：插件不会对键入环境进行判断，键入就会立马改变，如果还想键入上述中文字符，请先禁用插件