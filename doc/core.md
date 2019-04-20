## ggenerator

![](./sundry/ggenerator.png)



### template package 模板包

```bash
|-- templateRoot(any name)
    |-- Config
    |   |-- index.json
    |-- Ext
    |   |-- index.js
    |-- TemplateFiles
    |   |-- xxx.fom
    |   |-- xxx
    |   |   |-- XXX
    |   |   |   |-- xx1.jpg
    |   |   |   |-- xx2.doc
    |   |   |   |-- xxx1
    |   |   |   |   |-- xxx.gradle
    |   |   |   |   |-- src
    |   |   |   |       |-- main
    |   |   |   |-- xxx2
    |   |   |       |-- build.gradle
    |   |   |-- XXX2
    |   |       |-- xxx
    |   |       |   |-- xxxx
    |-- Workspace
        |-- project.fom
        |-- readme.md
```

detail in [howToMakeTemplate.md](./howToMakeTemplate.md)



### Dynamic package（ddata） 动态数据包

```bash
|-- anyname
    |-- Config
    |   |-- index.js
    |-- DataObject
    |   |-- index.json
    |-- FileCollection
        |-- some.txt
```

DataObject is main json  of ddata 

### fom (File Object Model) 文件对象模型

```xml
<?xml version="1.0" encoding="UTF-8" ?>
    <FOM>
        {@each ddata.gf as g, index}
        <NODE>
        <SOURCE>gf.txt</SOURCE>
        <TARGET>${g.name}.txt</TARGET>
        <DATA>ddata.gf[${index}]</DATA>
        </NODE>
        {@/each}
         <NODE>
        <SOURCE>gf.fom</SOURCE>
        <TARGET>gf/gf.fom</TARGET>
        </NODE>
        <NODE>
            <SOURCE>hobby.fom</SOURCE>
            <TARGET>hobby/hobby.fom</TARGET>
        </NODE>
        <NODE>
            <SOURCE>./readme.md</SOURCE>
            <TARGET>readme_${ddata.name}.md</TARGET>
            <OPERATE>RENAME</OPERATE>
        </NODE>

        <NODE>
            <SOURCE>$d/addFile.txt</SOURCE>
            <TARGET>addFile.txt</TARGET>
            <OPERATE>COPY</OPERATE>
        </NODE>
        <NODE>
        <SOURCE>$d/import.xls</SOURCE>
        <TARGET>templates/import.xls</TARGET>
        </NODE>
        <NODE>
        <TARGET>del.xls</TARGET>
        <OPERATE>DELETE</OPERATE>
        </NODE>
        <NODE>
        <SOURCE>./orgin.xls</SOURCE>
        <TARGET>new.xls</TARGET>
        <OPERATE>RENAME</OPERATE>
    </FOM>
```

more in [howToMakeFom.md](./howToMakeFom.md)



### normal File  常规文件内容

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="renderer" content="webkit">
    <title>${ddata.bigModule} Tabs</title>
</head>
<body>
<div id="tabs" xxx="tabs">
</div>
</body>
</html>
<script type="text/javascript">
    xx.config = {
        page: {
            //页面code
            pagecode: "${ddata.pageCode}-tabs"
        }
    };
    $(function() {
        xx.init();
        var requestParams = xx.util.getRequest();
        var state = requestParams.state;
        var oid = requestParams.oid;
        var pageNum = requestParams.pageNum;
        if (state && state == "add") {
            var headTab =
            {
                id: "tb_head",
                title: "表头信息",
                href: "head.html?pageNum="+pageNum,
                selected: true
            };
            xx.tabs.add("tabs", headTab);
        } else if (state && state == "edit") {
            var headTab =
            {
                id: "tb_head",
                title: "表头信息",
                href: "head.html?oid=" + oid+"&pageNum="+pageNum,
                selected: true
            };
            xx.tabs.add("tabs", headTab);
            {@if data.body}
            var bodyTab =
            {
                id: "tb_edit",
                title: "表体信息",
                href: "body.html?headOid=" + oid+"&pageNum="+pageNum,
                selected: false
            };
            xx.tabs.add("tabs", bodyTab);
            {@/if}
        }

    });

    function addBodyTab(headOid)
    {
        {@if data.body}
        var bodyTab =
        {
            id :"tb_edit",
            title : "表体信息",
            href :"body.html?headOid=" + headOid,
            selected: false
        };
        xx.tabs.add("tabs",bodyTab);
        xx.tabs.select("tabs","tb_edit");
         {@/if}
    }

</script>
```

more in [juicer](https://github.com/PaulGuo/Juicer)



### template inner object  模板内置对象

1. **data** :  data is an object from   <DATA> of  fom

2. **tConfig** : tConfig is an object from template's Config dir, we load it via require('templatePath/Config')

3. **tc**:  tc is short for tConfig

4. **dConfig** : dConfig is an object from dynamic's Config dir, we load it via require('DDataPath/Config')

5. **dc**: dc is short for dConfig

6. **ddata**: dConfig is an object from dynamic's Config dir, we load it via require('DDataPath/DataObject')

7. **d** : d is short for ddate