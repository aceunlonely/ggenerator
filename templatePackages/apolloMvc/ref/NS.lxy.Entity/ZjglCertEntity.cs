using System;
using System.Collections.Generic;
using Dcjet.Framework.Entity;
using System.Data;
namespace NS.lxy.Entity
{
    /// <summary>
    /// %ClassNameDescription%
    /// </summary>
    [EntityTable("T_ZJGL_CERT", "%ClassNameDescription%")]
    [Serializable]
    public class ZjglCertEntity : BaseEntity<ZjglCertEntity>
    {
       
        /// <summary>
		/// 唯一标识
		/// </summary>
        [EntityColumn(ColumnName="OID",ColumnDescName="唯一标识",AllowNull=false,ColumnType=DbType.String,MaxLength=36,PointLength=0,IsPriKey =true,IsIdentity =false, SortIndex ="-1")]
        public string Oid
        {
            get;
            set;
        }

        /// <summary>
		/// 证件类型
		/// </summary>
        [EntityColumn(ColumnName="CERT_TYPE",ColumnDescName="证件类型",AllowNull=false,ColumnType=DbType.String,MaxLength=200,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string CertType
        {
            get;
            set;
        }

        /// <summary>
		/// 证件编号
		/// </summary>
        [EntityColumn(ColumnName="CODE",ColumnDescName="证件编号",AllowNull=false,ColumnType=DbType.String,MaxLength=200,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Code
        {
            get;
            set;
        }

        /// <summary>
		/// 发证日期
		/// </summary>
        [EntityColumn(ColumnName="LICENCE_DATE",ColumnDescName="发证日期",AllowNull=true,ColumnType=DbType.DateTime,MaxLength=23,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public DateTime? LicenceDate
        {
            get;
            set;
        }

        /// <summary>
		/// 生效日期
		/// </summary>
        [EntityColumn(ColumnName="EFFECTIVE_DATE",ColumnDescName="生效日期",AllowNull=true,ColumnType=DbType.DateTime,MaxLength=23,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public DateTime? EffectiveDate
        {
            get;
            set;
        }

        /// <summary>
		/// 过期日期
		/// </summary>
        [EntityColumn(ColumnName="EXPIRY_DATE",ColumnDescName="过期日期",AllowNull=true,ColumnType=DbType.DateTime,MaxLength=23,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public DateTime? ExpiryDate
        {
            get;
            set;
        }

        /// <summary>
		/// 最大使用次数
		/// </summary>
        [EntityColumn(ColumnName="MAX_USE_COUNT",ColumnDescName="最大使用次数",AllowNull=true,ColumnType=DbType.Decimal,MaxLength=9,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public decimal? MaxUseCount
        {
            get;
            set;
        }

        /// <summary>
		/// 剩余使用次数
		/// </summary>
        [EntityColumn(ColumnName="LEFT_USE_COUNT",ColumnDescName="剩余使用次数",AllowNull=true,ColumnType=DbType.Decimal,MaxLength=9,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public decimal? LeftUseCount
        {
            get;
            set;
        }

        /// <summary>
		/// 公司别编码
		/// </summary>
        [EntityColumn(ColumnName="CORP_CODE",ColumnDescName="公司别编码",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string CorpCode
        {
            get;
            set;
        }

        /// <summary>
		/// 状态
		/// </summary>
        [EntityColumn(ColumnName="STATUS",ColumnDescName="状态",AllowNull=true,ColumnType=DbType.Decimal,MaxLength=22,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public decimal? Status
        {
            get;
            set;
        }

    }
}
