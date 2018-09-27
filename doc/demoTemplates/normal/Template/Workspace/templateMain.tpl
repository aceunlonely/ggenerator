{# 变量}
变量：

Template Config.code : ${tc.code}
Template Config.version : ${tConfig.version}

DData Config.remark : ${dc.remark}
DData Config.egg : ${dConfig.egg}

DData DataObject.lover.name : ${d.lover.name}
DData DataObject.lover.age : ${ddata.lover.age}

{# each}
遍历：
{@each d.hobbies as hobby, index}
   ${index}  |  item:${hobby.name} | weight: ${hobby.weight}
{@/each}
{# 条件}
{@if d.hobbies.length > 2}
    she has many hobbies : ${d.hobbies.length}
{@/if}

{# 辅助循环}
辅助循环
{@each i in range(5,10)}
    ${i};
{@/each}
{# 嵌套 include， 略}

{# 自定义函数}
{@helper numberPlus}
    function(number) {
        return number + 1;
    }
{@/helper}

Number: ${1|numberPlus}

{# 特殊注释}
$<gg[{dolloer}]> or $<gg[{]>dolloer}


Ext function
{@if testTwoParam("1","1")}
    Ext success
{@/if}

${"true"|testOneParam}

特殊处理
<gg[#]>