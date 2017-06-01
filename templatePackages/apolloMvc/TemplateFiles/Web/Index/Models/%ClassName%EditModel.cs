using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dcjet.Apollo.MvcBase;
using %NameSpace%Entity;
using %NameSpace%Web.Common;

namespace %NameSpace%Web.Areas.%MVC-MODULE%.Models
{
    /// <summary>
    /// %TableDesc%视图模型
    /// </summary>
    public class %ClassName%EditModel : %NameSpaceOnly%BaseModel
    {

        public string ID { get; set; }
       
        public %ClassName%Entity %ClassNameObj% { get; set; }
		
		//数据绑定数据源
		%MVC_MODELCTRLLISTEDIT%

    }
}