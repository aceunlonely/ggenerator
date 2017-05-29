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
using NS.lxy.Web.Areas.M.Models;
using NS.lxy.Web.Common;
using NS.lxy.Core.Bll;
using NS.lxy.Core.Common;
using NS.lxy.Entity;

namespace NS.lxy.Web.Areas.M.Controllers
{
    public class ZjglCertController : NS.lxyBaseController
    {
        private readonly ZjglCertBlo _zjglCertBlo = new ZjglCertBlo();
        [PermissionFilter(PageCode = "ZJGL_PAGE_CODE")]
        public ActionResult Index(ZjglCertIndexModel model)
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
        public JsonResult LoadIndexData(ZjglCertIndexModel model)
        {

            var pagedParames = GetParedPagedParameters(model);
            var result = _zjglCertBlo.Select(pagedParames);

            return Json(result);
        }

        /// <summary>
        /// 拼接查询条件
        /// </summary>
        /// <param name="model">model</param>
        /// <returns>查询条件</returns>
        public PagedParameters GetParedPagedParameters(ZjglCertIndexModel model)
        {
            var pagedParames = new PagedParameters();
            var listWhere = new List<WhereParams>();

            #region 业务代码,拼装查询条件
          
            #endregion
            pagedParames.TableName = "T_ZJGL_CERT";
            pagedParames.WhereParamsList = listWhere;
            pagedParames.PagedOrderColumns = "INSERT_TIME desc";
            pagedParames.PageIndex = model.SearchEntity._PageIndex.Value;
            pagedParames.PageSize = model.SearchEntity._PageSize.Value;
			
			#region 业务代码,如果页面上有code,则进行code转换
			#endregion
            return pagedParames;
        }

         /// <summary>
        /// 视图
        /// </summary>
        /// <returns></returns>
        public ActionResult Edit(ZjglCertEditModel model)
        {
            return View(model);
        }

        public ActionResult OutHead(ZjglCertEditModel model)
        {
            RetriveEditData(model);
            return View(model);
        }

        /// <summary>
        /// 加载修改的数据
        /// </summary>
        /// <param name="model"></param>
        public void RetriveEditData(ZjglCertEditModel model)
        {
            #region  业务代码,加载model数据源
            
            #endregion

           if (!string.IsNullOrEmpty(model.ID))
            {
                //根据ID获取实体信息
                model.zjglCert = _zjglCertBlo.Select(model.ID);
				#region 业务代码，如果页面有AutoComplete则需要对Model中对应的Name属性赋值
				#endregion
			}
        }


        [HttpPost]
        public ActionResult Edit(ZjglCertEditModel model, FormCollection formCollection)
        {
            var result = EditDetail(model);
            return Json(result);
        }

        /// <summary>
        /// 添加或者修改的详细过程
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public Result EditDetail(ZjglCertEditModel model)
        {


            if (string.IsNullOrEmpty(model.ID))
            {
                #region 业务代码，为默认值字段赋值，例如OID,InsertTime
               
                #endregion

               return _zjglCertBlo.Insert(model.zjglCert);               
            }
            else
            {
                var updateEntity = _zjglCertBlo.Select(model.ID);
                #region 业务代码，将Model中的实体属性赋值到更新实体上
                
    updateEntity.CertType = model.zjglCert.CertType;
    updateEntity.Code = model.zjglCert.Code;
    updateEntity.LicenceDate = model.zjglCert.LicenceDate;
    updateEntity.EffectiveDate = model.zjglCert.EffectiveDate;
    updateEntity.ExpiryDate = model.zjglCert.ExpiryDate;
    updateEntity.MaxUseCount = model.zjglCert.MaxUseCount;
    updateEntity.LeftUseCount = model.zjglCert.LeftUseCount;
    updateEntity.CorpCode = model.zjglCert.CorpCode;
    updateEntity.Status = model.zjglCert.Status;
                #endregion

                return _zjglCertBlo.Update(updateEntity);
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
            var result = _zjglCertBlo.Delete(oid);
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
            var res = _zjglCertBlo.Delete(arrayOids);
            return Json(res);
        }
		
		
		
		 
		  
		
		
		
    
    }

}

