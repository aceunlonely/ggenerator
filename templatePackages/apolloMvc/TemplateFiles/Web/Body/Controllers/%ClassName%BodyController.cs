using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dcjet.Apollo.MvcCommon;
using Dcjet.Framework.DataProvider;
using Dcjet.Framework.Entity;
using Dcjet.Framework.Helpers;
using %NameSpace%Web.Areas.%MVC-MODULE%.Models;
using %NameSpace%Web.Common;
using %NameSpace%Core.Bll;
using %NameSpace%Entity;


namespace %NameSpace%Web.Areas.%MVC-MODULE%.Controllers
{
    public class %ClassName%BodyController : %NameSpaceOnly%BaseController
    {
        private readonly %ClassName%Blo _%ClassNameObj%Blo = new %ClassName%Blo();

        public ActionResult OutBody(%ClassName%EditModel model)
        {
            #region 业务代码,加载model数据源
            #endregion
		   return View(model);
        }     

        [HttpPost]
        public JsonResult LoadIndexData(%ClassName%EditModel model)
        {
            var pagedParames = GetParedPagedParameters(model);
            var result = _%ClassNameObj%Blo.Select(pagedParames);
            return Json(result);
        }

        /// <summary>
        /// 拼接查询条件
        /// </summary>
        /// <param name="model">model</param>
        /// <returns>查询条件</returns>
        public PagedParameters GetParedPagedParameters(%ClassName%EditModel model)
        {
            var pagedParames = new PagedParameters();
            var listWhere = new List<WhereParams>();

            #region 业务代码,拼装查询条件
			
            #endregion

            pagedParames.WhereParamsList = listWhere;
            pagedParames.TableName = "%TableName%";
            pagedParames.PageIndex = model.SearchEntity._PageIndex.Value;
            pagedParames.PageSize = model.SearchEntity._PageSize.Value;
			#region 业务代码,如果页面上有code,则进行code转换

            #endregion
			
            return pagedParames;
        }
		
		 /// <summary>
        /// 加载修改的数据
        /// </summary>
        /// <param name="oid">主键</param>
        /// <returns>修改数据的json</returns>
        [HttpPost]  
        public ActionResult GetEditData(string oid)
        {
            var entity = _%ClassNameObj%Blo.Select(oid);
            return Json(entity);
        }


        [HttpPost]
        public ActionResult Edit(%ClassName%EditModel model, FormCollection formCollection)
        {
            var result = EditDetail(model);
            return Json(result);
        }

        /// <summary>
        /// 添加或者修改的详细过程
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public Result EditDetail(%ClassName%EditModel model)
        {
            if (string.IsNullOrEmpty(model.ID))
            {
                #region 业务代码，为默认值字段赋值，例如OID,InsertTime

                #endregion

                return _%ClassNameObj%Blo.Insert(model.%ClassNameObj%);
            }
            else
            {
                var updateEntity = _%ClassNameObj%Blo.Select(model.ID);

                #region 业务代码，将Model中的实体属性赋值到更新实体上
				%MVC-CONTROLLEREDITPROPERTY%
                #endregion

                return _%ClassNameObj%Blo.Update(updateEntity);
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
            var result = _%ClassNameObj%Blo.Delete(oid);
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
            var res = _%ClassNameObj%Blo.Delete(arrayOids);
            return Json(res);
        }
    }

}

