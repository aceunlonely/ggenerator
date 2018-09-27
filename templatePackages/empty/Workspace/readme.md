<gg[#]> help
<gg[##]> structure:
{@if !d.isCombo}
    |--DData
    |--Template
{@/if}
{@if d.isCombo}
    |--Template
        |--TDData
{@/if}

<gg[#]> en
    (T)DData : here is dynamic data for your Template, ddata + template => your Target files
    Template : here is fixed Template

<gg[##]> how to use 
    cd currentDir
    gg Tempalte {@if !d.isCombo}DData{@/if} -t Target -w Workplace

<gg[#]> 中文说明
    (T)DData : 存放动态数据，动态数据一般由用户自己编辑，也可以通过其他系统生成，与模板（Template）格式对应， 通过gg引擎，结合模板和动态数据生成目标文件
    Template ： 模板

<gg[#]> PS
    more details in subDirs