using System;
using System.Collections.Generic;
using Dcjet.Framework.Entity;
using System.Data;
namespace NS.lxy.Entity
{
    /// <summary>
    /// %ClassNameDescription%
    /// </summary>
    [EntityTable("T_ZJGL_CERT_LIST_IMG", "%ClassNameDescription%")]
    [Serializable]
    public class ZjglCertListImgEntity : BaseEntity<ZjglCertListImgEntity>
    {
       
        /// <summary>
		/// 唯一标识
		/// </summary>
        [EntityColumn(ColumnName="OID",ColumnDescName="唯一标识",AllowNull=false,ColumnType=DbType.String,MaxLength=36,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Oid
        {
            get;
            set;
        }

        /// <summary>
		/// 证件关联ID
		/// </summary>
        [EntityColumn(ColumnName="CERT_OID",ColumnDescName="证件关联ID",AllowNull=true,ColumnType=DbType.String,MaxLength=36,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string CertOid
        {
            get;
            set;
        }

        /// <summary>
		/// 料号
		/// </summary>
        [EntityColumn(ColumnName="IMG_NO",ColumnDescName="料号",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string ImgNo
        {
            get;
            set;
        }

        /// <summary>
		/// 项次
		/// </summary>
        [EntityColumn(ColumnName="G_NO",ColumnDescName="项次",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string GNo
        {
            get;
            set;
        }

        /// <summary>
		/// 商编
		/// </summary>
        [EntityColumn(ColumnName="HS_CODE",ColumnDescName="商编",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string HsCode
        {
            get;
            set;
        }

        /// <summary>
		/// 品名
		/// </summary>
        [EntityColumn(ColumnName="GOOD_DESC",ColumnDescName="品名",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string GoodDesc
        {
            get;
            set;
        }

        /// <summary>
		/// 料号位置
		/// </summary>
        [EntityColumn(ColumnName="POSITION",ColumnDescName="料号位置",AllowNull=true,ColumnType=DbType.Decimal,MaxLength=22,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public decimal? Position
        {
            get;
            set;
        }

        /// <summary>
		/// 备案量
		/// </summary>
        [EntityColumn(ColumnName="MAX_QUANTITY",ColumnDescName="备案量",AllowNull=true,ColumnType=DbType.Decimal,MaxLength=9,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public decimal? MaxQuantity
        {
            get;
            set;
        }

        /// <summary>
		/// 剩余数量
		/// </summary>
        [EntityColumn(ColumnName="LEFT_QUANTITY",ColumnDescName="剩余数量",AllowNull=true,ColumnType=DbType.Decimal,MaxLength=9,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public decimal? LeftQuantity
        {
            get;
            set;
        }

        /// <summary>
		/// 材料本体/最小包装是否有3C/CQC
		/// </summary>
        [EntityColumn(ColumnName="HAS_INNER_CERT",ColumnDescName="材料本体/最小包装是否有3C/CQC",AllowNull=true,ColumnType=DbType.Decimal,MaxLength=22,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public decimal? HasInnerCert
        {
            get;
            set;
        }

        /// <summary>
		/// IEC、GB或其他执行标准
		/// </summary>
        [EntityColumn(ColumnName="STANDARD",ColumnDescName="IEC、GB或其他执行标准",AllowNull=true,ColumnType=DbType.String,MaxLength=500,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Standard
        {
            get;
            set;
        }

        /// <summary>
		/// 判定日期
		/// </summary>
        [EntityColumn(ColumnName="JUDGE_DATE",ColumnDescName="判定日期",AllowNull=true,ColumnType=DbType.DateTime,MaxLength=23,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public DateTime? JudgeDate
        {
            get;
            set;
        }

        /// <summary>
		/// 英文描述
		/// </summary>
        [EntityColumn(ColumnName="EN_DESC",ColumnDescName="英文描述",AllowNull=true,ColumnType=DbType.String,MaxLength=500,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string EnDesc
        {
            get;
            set;
        }

        /// <summary>
		/// 单位
		/// </summary>
        [EntityColumn(ColumnName="UNIT",ColumnDescName="单位",AllowNull=true,ColumnType=DbType.String,MaxLength=50,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Unit
        {
            get;
            set;
        }

        /// <summary>
		/// 厂商
		/// </summary>
        [EntityColumn(ColumnName="SUPPLY",ColumnDescName="厂商",AllowNull=true,ColumnType=DbType.String,MaxLength=200,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Supply
        {
            get;
            set;
        }

        /// <summary>
		/// 厂商料号/型号
		/// </summary>
        [EntityColumn(ColumnName="SUPPLY_IMG_NO",ColumnDescName="厂商料号/型号",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string SupplyImgNo
        {
            get;
            set;
        }

        /// <summary>
		/// 厂别编码
		/// </summary>
        [EntityColumn(ColumnName="COMPANY_CODE",ColumnDescName="厂别编码",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string CompanyCode
        {
            get;
            set;
        }

        /// <summary>
		/// 负责采购
		/// </summary>
        [EntityColumn(ColumnName="PUCHASER",ColumnDescName="负责采购",AllowNull=true,ColumnType=DbType.String,MaxLength=200,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Puchaser
        {
            get;
            set;
        }

        /// <summary>
		/// Incoterms
		/// </summary>
        [EntityColumn(ColumnName="INCOTERMS",ColumnDescName="Incoterms",AllowNull=true,ColumnType=DbType.String,MaxLength=500,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Incoterms
        {
            get;
            set;
        }

        /// <summary>
		/// 国别/港口
		/// </summary>
        [EntityColumn(ColumnName="PORT",ColumnDescName="国别/港口",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Port
        {
            get;
            set;
        }

        /// <summary>
		/// 原產國
		/// </summary>
        [EntityColumn(ColumnName="ORIGIN",ColumnDescName="原產國",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Origin
        {
            get;
            set;
        }

        /// <summary>
		/// 貿易國
		/// </summary>
        [EntityColumn(ColumnName="EXPORTATION",ColumnDescName="貿易國",AllowNull=true,ColumnType=DbType.String,MaxLength=100,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Exportation
        {
            get;
            set;
        }

        /// <summary>
		/// 代办证提醒OID
		/// </summary>
        [EntityColumn(ColumnName="WARN_NEED_OID",ColumnDescName="代办证提醒OID",AllowNull=true,ColumnType=DbType.String,MaxLength=36,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string WarnNeedOid
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

        /// <summary>
		/// 是否确认(1 已确认/ 2未确认/3 规格图)
		/// </summary>
        [EntityColumn(ColumnName="ISCONFIRM",ColumnDescName="是否确认(1 已确认/ 2未确认/3 规格图)",AllowNull=true,ColumnType=DbType.String,MaxLength=50,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Isconfirm
        {
            get;
            set;
        }

        /// <summary>
		/// 备注
		/// </summary>
        [EntityColumn(ColumnName="REMARK",ColumnDescName="备注",AllowNull=true,ColumnType=DbType.String,MaxLength=1000,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string Remark
        {
            get;
            set;
        }

        /// <summary>
		/// 
		/// </summary>
        [EntityColumn(ColumnName="GS_CODE",ColumnDescName="",AllowNull=true,ColumnType=DbType.String,MaxLength=50,PointLength=0,IsPriKey =false,IsIdentity =false, SortIndex ="-1")]
        public string GsCode
        {
            get;
            set;
        }

    }
}
