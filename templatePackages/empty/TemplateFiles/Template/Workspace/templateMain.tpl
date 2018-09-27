{<gg[#]> 变量}
变量：

Template Config.code : <gg[$]>{tc.code}
Template Config.version : <gg[$]>{tConfig.version}

DData Config.remark : <gg[$]>{dc.remark}
DData Config.egg : <gg[$]>{dConfig.egg}

DData DataObject.lover.name : <gg[$]>{d.lover.name}
DData DataObject.lover.age : <gg[$]>{ddata.lover.age}

{<gg[#]> each}
遍历：
{<gg[@]>each d.hobbies as hobby, index}
   <gg[$]>{index}  |  item:<gg[$]>{hobby.name} | weight: <gg[$]>{hobby.weight}
{<gg[@]>/each}
{<gg[#]> 条件}
{<gg[@]>if d.hobbies.length > 2}
    she has many hobbies : <gg[$]>{d.hobbies.length}
{<gg[@]>/if}

{<gg[#]> 辅助循环}
辅助循环
{<gg[@]>each i in range(5,10)}
    <gg[$]>{i};
{<gg[@]>/each}
{<gg[#]> 嵌套 include， 略}

{<gg[#]> 自定义函数}
{<gg[@]>helper numberPlus}
    function(number) {
        return number + 1;
    }
{<gg[@]>/helper}

Number: <gg[$]>{1|numberPlus}

{<gg[#]> 特殊注释}
$<gg[<]>gg[<gg[{dolloer}]>]> or $<gg[<]>gg[<gg[{]>]>dolloer}


Ext function
{<gg[@]>if testTwoParam("1","1")}
    Ext success
{<gg[@]>/if}

<gg[$]>{"true"|testOneParam}

特殊处理
<gg[<]>gg[<gg[#]>]>