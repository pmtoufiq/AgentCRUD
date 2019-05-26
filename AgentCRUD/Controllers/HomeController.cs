using AgentCRUD.DLL;
using AgentCRUD.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AgentCRUD.Controllers
{
    public class HomeController : Controller
    {
        AgentDB agentDB = new AgentDB();

        // GET: Home

        public ActionResult Index()

        {

            return View();

        }

        public JsonResult ImageUpload(Agent model)
        {

            var file = model.ImageFile;

            if (file != null)
            {

                var fileName = Path.GetFileName(file.FileName);
                var extention = Path.GetExtension(file.FileName);
                var filenamewithoutextension = Path.GetFileNameWithoutExtension(file.FileName);

                file.SaveAs(Server.MapPath("/UploadedImage/" + file.FileName));


            }

            return Json(file.FileName, JsonRequestBehavior.AllowGet);

        }

        public JsonResult List()

        {

            return Json(agentDB.ListAll(), JsonRequestBehavior.AllowGet);

        }

        public JsonResult Add(Agent agent)

        {
            var fileName = DateTime.Now.ToString("MMddyyyyhhmmss");
            if (Request.Files.Count > 0)
            {
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var file = Request.Files[i];
                    fileName = fileName + Path.GetFileName(file.FileName);
                    var extension = fileName.Split('.').Last();
                    

                    var filenamewithoutextension = Path.GetFileNameWithoutExtension(file.FileName);

                    
                    file.SaveAs(Server.MapPath("/Content/UploadedImage/" + fileName));
                }
               
            }

            Agent obj = new Agent();
            obj.Code = Request["Code"].ToString();
            obj.Email = Request["Email"].ToString();
            obj.Name = Request["Name"].ToString();
            obj.Street = Request["Street"].ToString();
            obj.City = Request["City"].ToString();
            obj.State = Request["State"].ToString();
            obj.Zip = Request["Zip"].ToString();
            obj.Country = Request["Country"].ToString();
            obj.Mobile = Request["Mobile"].ToString();
            obj.Phone = Request["Phone"].ToString();
            obj.ContactPerson = Request["ContactPerson"].ToString();
            obj.ReferredBy = Request["ReferredBy"].ToString();
            obj.Status = Convert.ToInt32(Request["Status"].ToString());
            obj.Balance = Convert.ToDecimal(Request["Balance"].ToString());
            obj.LoginUrl = Request["LoginUrl"].ToString();
            obj.SecurityCode = Request["SecurityCode"].ToString();
            obj.SMTPPort = Convert.ToInt32(Request["SMTPPort"].ToString());
            obj.CurrentBalance = Convert.ToDecimal(Request["CurrentBalance"].ToString());
            obj.Logo = fileName;

            return Json(agentDB.Add(obj), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetbyID(int ID)

        {

            var Agent = agentDB.ListAll().Find(x => x.BusinessId.Equals(ID));

            return Json(Agent, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Update(Agent agent)

        {
            var fileName = DateTime.Now.ToString("MMddyyyyhhmmss");
            if (Request.Files.Count > 0)
            {
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var file = Request.Files[i];
                    fileName = fileName + Path.GetFileName(file.FileName);
                    var extension = fileName.Split('.').Last();


                    var filenamewithoutextension = Path.GetFileNameWithoutExtension(file.FileName);


                    file.SaveAs(Server.MapPath("/Content/UploadedImage/" + fileName));
                }

            }

            Agent obj = new Agent();
            obj.BusinessId = Convert.ToInt32(Request["BusinessId"].ToString());
            obj.Code = Request["Code"].ToString();
            obj.Email = Request["Email"].ToString();
            obj.Name = Request["Name"].ToString();
            obj.Street = Request["Street"].ToString();
            obj.City = Request["City"].ToString();
            obj.State = Request["State"].ToString();
            obj.Zip = Request["Zip"].ToString();
            obj.Country = Request["Country"].ToString();
            obj.Mobile = Request["Mobile"].ToString();
            obj.Phone = Request["Phone"].ToString();
            obj.ContactPerson = Request["ContactPerson"].ToString();
            obj.ReferredBy = Request["ReferredBy"].ToString();
            obj.Status = Convert.ToInt32(Request["Status"].ToString());
            obj.Balance = Convert.ToDecimal(Request["Balance"].ToString());
            obj.LoginUrl = Request["LoginUrl"].ToString();
            obj.SecurityCode = Request["SecurityCode"].ToString();
            obj.SMTPPort = Convert.ToInt32(Request["SMTPPort"].ToString());
            obj.CurrentBalance = Convert.ToDecimal(Request["CurrentBalance"].ToString());
            obj.Logo = fileName;

            return Json(agentDB.Update(obj), JsonRequestBehavior.AllowGet);

        }

        public JsonResult Delete(int ID)

        {

            return Json(agentDB.Delete(ID), JsonRequestBehavior.AllowGet);

        }
    }
}