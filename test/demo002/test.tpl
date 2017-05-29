

abc
def
accc
{# 变量}
my name is ${name}
my age is ${age}
{# each}my hobbies are :
{@each hobbies as hobby, index}
   ${index}  |  item:${hobby.name} | weight: ${hobby.weight}
{@/each}
{# 条件}
{@if hobbies.length > 2}
    i have many hobbies : ${hobbies.length}
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