using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NS.lxy.Web.Common;

namespace NS.lxy.Web.Areas.M.Search
{
    /// <summary>
    /// 页面查询实体
    /// </summary>
    public class ZjglCertSearch : NS.lxyBaseSearch
    {
        
        /// <summary>
        /// 证件类型
        /// </summary>
        public string CertType
        {
            get;
            set;
        }

        /// <summary>
        /// 证件编号
        /// </summary>
        public string Code
        {
            get;
            set;
        }

        /// <summary>
        /// 发证日期
        /// </summary>
        public DateTime? LicenceDateBegin
        {
            get;
            set;
        }

        /// <summary>
        /// 发证日期
        /// </summary>
        public DateTime? LicenceDateEnd
        {
            get;
            set;
        }

        /// <summary>
        /// 生效日期
        /// </summary>
        public DateTime? EffectiveDateBegin
        {
            get;
            set;
        }

        /// <summary>
        /// 生效日期
        /// </summary>
        public DateTime? EffectiveDateEnd
        {
            get;
            set;
        }

        /// <summary>
        /// 过期日期
        /// </summary>
        public DateTime? ExpiryDateBegin
        {
            get;
            set;
        }

        /// <summary>
        /// 过期日期
        /// </summary>
        public DateTime? ExpiryDateEnd
        {
            get;
            set;
        }

        /// <summary>
        /// 最大使用次数
        /// </summary>
        public decimal? MaxUseCount
        {
            get;
            set;
        }

        /// <summary>
        /// 剩余使用次数
        /// </summary>
        public decimal? LeftUseCount
        {
            get;
            set;
        }

        /// <summary>
        /// 公司别编码
        /// </summary>
        public string CorpCode
        {
            get;
            set;
        }

        /// <summary>
        /// 状态
        /// </summary>
        public decimal? Status
        {
            get;
            set;
        }

    }
}