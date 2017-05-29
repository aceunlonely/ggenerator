using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dcjet.Apollo.MvcBase.Filter;
using Dcjet.Apollo.MvcBase.Utility;
using Dcjet.Apollo.MvcCommon;
using Dcjet.Framework.DataProvider;
using Dcjet.Framework.Entity;
using Dcjet.Framework.Helpers;
using ${ddata.solution.NameSpace}.Web.Areas.${data.ModelName}.Models;
using ${ddata.solution.NameSpace}.Web.Common;
using ${ddata.solution.NameSpace}.Core.Bll;
using ${ddata.solution.NameSpace}.Core.Common;
using ${ddata.solution.NameSpace}.Entity;
{# 自定义函数}
{@helper firstLowerCase}
    function(A) {
        return A.replace(/(\w)/,function(v){return v.toLowerCase()});
    }
{@/helper}

namespace ${ddata.solution.NameSpace}.Web.Areas.${data.ModelName}.Controllers
{
    public class ${data.Name}Controller : ${ddata.solution.NameSpace}BaseController
    {
        private readonly ${data.Name}Blo _${data.Name|firstLowerCase}Blo = new ${data.Name}Blo();
        [PermissionFilter(PageCode = "${data.PageCode}")]
        public ActionResult Index(${data.Name}IndexModel model)
        {
            
            #region 业务代码,加载model数据源

            ${'#'}endregion

            return View(model);
        }
