using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dcjet.Apollo.MvcBase;
using NS.lxy.Entity;
using NS.lxy.Web.Common;

namespace NS.lxy.Web.Areas.M.Models
{
    /// <summary>
    /// 证件表视图模型
    /// </summary>
    public class ZjglCertEditModel : NS.lxyBaseModel
    {

        public string ID { get; set; }
       
        public ZjglCertEntity zjglCert { get; set; }
		
		//数据绑定数据源
		

    }
}