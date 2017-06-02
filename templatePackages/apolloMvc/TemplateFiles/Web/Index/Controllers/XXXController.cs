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

namespace ${ddata.solution.NameSpace}.Web.Areas.${data.ModelName}.Controllers
{
    public class ${data.Name}Controller : ${ddata.solution.NameSpace}BaseController
    {
        private readonly ${data.Name}Blo _${data.Name|firstLowerCase}Blo = new ${data.Name}Blo();
        [PermissionFilter(PageCode = "${data.PageCode}")]
        public ActionResult Index(${data.Name}IndexModel model)
        {
            #region 业务代码,加载model数据源

            #endregion

            return View(model);
        }

        /// <summary>
        /// 加载数据集
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult LoadIndexData(${data.Name}IndexModel model)
        {

            var pagedParames = GetParedPagedParameters(model);
            var result = _${data.Name|firstLowerCase}Blo.Select(pagedParames);

            return Json(result);
        }

        /// <summary>
        /// 拼接查询条件
        /// </summary>
        /// <param name="model">model</param>
        /// <returns>查询条件</returns>
        public PagedParameters GetParedPagedParameters(${data.Name}IndexModel model)
        {
            var pagedParames = new PagedParameters();
            var listWhere = new List<WhereParams>();

            #region 业务代码,拼装查询条件
          
            #endregion
            pagedParames.TableName = "${data.DataSourceName}";
            pagedParames.WhereParamsList = listWhere;
            pagedParames.PagedOrderColumns = "INSERT_TIME desc";
            pagedParames.PageIndex = model.SearchEntity._PageIndex.Value;
            pagedParames.PageSize = model.SearchEntity._PageSize.Value;
			
			#region 业务代码,如果页面上有code,则进行code转换
			#endregion
            return pagedParames;
        }

        %MVC-HTML-HeadEdit%

        public ActionResult OutHead(${data.Name}EditModel model)
        {
            RetriveEditData(model);
            return View(model);
        }

        /// <summary>
        /// 加载修改的数据
        /// </summary>
        /// <param name="model"></param>
        public void RetriveEditData(${data.Name}EditModel model)
        {
            #region  业务代码,加载model数据源
            
            #endregion

           if (!string.IsNullOrEmpty(model.ID))
            {
                //根据ID获取实体信息
                model.${data.Name|firstLowerCase} = _${data.Name|firstLowerCase}Blo.Select(model.ID);
				#region 业务代码，如果页面有AutoComplete则需要对Model中对应的Name属性赋值
				#endregion
			}
        }


        [HttpPost]
        public ActionResult Edit(${data.Name}EditModel model, FormCollection formCollection)
        {
            var result = EditDetail(model);
            return Json(result);
        }

        /// <summary>
        /// 添加或者修改的详细过程
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public Result EditDetail(${data.Name}EditModel model)
        {


            if (string.IsNullOrEmpty(model.ID))
            {
                #region 业务代码，为默认值字段赋值，例如OID,InsertTime
               
                #endregion

               return _${data.Name|firstLowerCase}Blo.Insert(model.${data.Name|firstLowerCase});               
            }
            else
            {
                var updateEntity = _${data.Name|firstLowerCase}Blo.Select(model.ID);
                #region 业务代码，将Model中的实体属性赋值到更新实体上
                %MVC_CONTROLLEREDITPROPERTY%
                #endregion

                return _${data.Name|firstLowerCase}Blo.Update(updateEntity);
            }


        }


        /// <summary>
        /// 单个删除
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Delete(string oid)
        {
            //这里写删除业务
            var result = _${data.Name|firstLowerCase}Blo.Delete(oid);
            return Json(result);
        }


        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="oids"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult DeleteAll(string oids)
        {
            //这里写删除业务
            var arrayOids = oids.Split(',').ToList();
            var res = _${data.Name|firstLowerCase}Blo.Delete(arrayOids);
            return Json(res);
        }
		
		%MVC_CONTROLLERIMPORT%
		
		%MVC_CONTROLLEREXPORT% 
		  
		%MVC_CONTROLLERSYNCEXPORT%
		
		%MVC_CONTROLLERSYNCIMPORT%
    
    }

}

