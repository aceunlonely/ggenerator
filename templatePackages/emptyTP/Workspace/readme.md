this is a document of readme.



my name is  ${ddata.name}

i have  ${ddata.hobbies.length} hobbies, they are :
{@each ddata.hobbies as hobby, index}
   ${index}  |  name:${hobby.name} | weight: ${hobby.weight}
{@/each}


=====================================================================

i have also ${ddata.gf.length} gfs , they are :
{@each ddata.gf as g, index}
   ${index}  |  name:${g.name} | hp: ${g.hp} | mp : ${g.mp}
{@/each}


=test tc=====================================================================
${tc.version}   |  ${tConfig.company}



=test dc=====================================================================
${dc.author}    |  ${dConfig.age}