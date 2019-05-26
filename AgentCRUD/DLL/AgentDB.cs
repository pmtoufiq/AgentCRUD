using AgentCRUD.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AgentCRUD.DLL
{
    public class AgentDB:Gateway
    {
        public List<Agent> ListAll()

        {


            List<Agent> agentList = new List<Agent>();


            {

                Connection.Open();
                Command = new SqlCommand("SelectBusinessEntities", Connection);
                Command.CommandType = CommandType.StoredProcedure;
                Reader = Command.ExecuteReader();
                while (Reader.Read())

                {

                    agentList.Add(new Agent
                    {

                        BusinessId = Convert.ToInt32(Reader["BusinessId"]),
                        Code = Reader["Code"].ToString(),
                        Email = Reader["Email"].ToString(),
                        Name = Reader["Name"].ToString(),
                        Street = Reader["Street"].ToString(),
                        City = Reader["City"].ToString(),
                        State = Reader["State"].ToString(),
                        Zip = Reader["Zip"].ToString(),
                        Country = Reader["Country"].ToString(),
                        Mobile = Reader["Mobile"].ToString(),
                        Phone = Reader["Phone"].ToString(),
                        ContactPerson = Reader["ContactPerson"].ToString(),
                        ReferredBy = Reader["ReferredBy"].ToString(),
                        Logo = Reader["Logo"].ToString(),
                        Status = Convert.ToInt32(Reader["Status"]),
                        Balance = Convert.ToDecimal(Reader["Balance"]),
                        LoginUrl = Reader["LoginUrl"].ToString(),
                        SecurityCode = Reader["SecurityCode"].ToString(),
                        SMTPPort = Convert.ToInt32(Reader["SMTPPort"]),
                        CurrentBalance = Convert.ToDecimal(Reader["CurrentBalance"]),

                    });

                }

                return agentList;

            }

        }

        //Method for Adding an Employee

        public int Add(Agent agent)

        {

            int i;

            {
                Connection.Open();
                Command = new SqlCommand("InsertupdateBusinessEntities", Connection);
                Command.CommandType = CommandType.StoredProcedure;

                Command.Parameters.AddWithValue("@Id", agent.BusinessId);
                Command.Parameters.AddWithValue("Code", agent.Code);
                Command.Parameters.AddWithValue("Email", agent.Email);
                Command.Parameters.AddWithValue("Name", agent.Name);
                Command.Parameters.AddWithValue("Street", agent.Street);
                Command.Parameters.AddWithValue("City", agent.City);
                Command.Parameters.AddWithValue("Zip", agent.Zip);
                Command.Parameters.AddWithValue("State", agent.State);
                Command.Parameters.AddWithValue("Country", agent.Country);
                Command.Parameters.AddWithValue("Mobile", agent.Mobile);
                Command.Parameters.AddWithValue("Phone", agent.Phone);
                Command.Parameters.AddWithValue("ContactPerson", agent.ContactPerson);
                Command.Parameters.AddWithValue("ReferredBy", agent.ReferredBy);
                Command.Parameters.AddWithValue("Logo", agent.Logo);
                Command.Parameters.AddWithValue("Status", agent.Status);
                Command.Parameters.AddWithValue("Balance", agent.Balance);
                Command.Parameters.AddWithValue("LoginUrl", agent.LoginUrl);
                Command.Parameters.AddWithValue("SecurityCode", agent.SecurityCode);
                Command.Parameters.AddWithValue("SMTPPort", agent.SMTPPort);
                Command.Parameters.AddWithValue("Deleted", agent.Deleted);
                Command.Parameters.AddWithValue("CurrentBalance", agent.CurrentBalance);

                Command.Parameters.AddWithValue("@Action", "Insert");

                i = Command.ExecuteNonQuery();

            }

            return i;

        }

        //Method for Updating Employee record

        public int Update(Agent agent)

        {

            int i;

            {

                Connection.Open();
                Command = new SqlCommand("InsertupdateBusinessEntities", Connection);
                Command.CommandType = CommandType.StoredProcedure;

                Command.Parameters.AddWithValue("@Id", agent.BusinessId);
                Command.Parameters.AddWithValue("Code", agent.Code);
                Command.Parameters.AddWithValue("Email", agent.Email);
                Command.Parameters.AddWithValue("Name", agent.Name);
                Command.Parameters.AddWithValue("Street", agent.Street);
                Command.Parameters.AddWithValue("City", agent.City);
                Command.Parameters.AddWithValue("Zip", agent.Zip);
                Command.Parameters.AddWithValue("State", agent.State);
                Command.Parameters.AddWithValue("Country", agent.Country);
                Command.Parameters.AddWithValue("Mobile", agent.Mobile);
                Command.Parameters.AddWithValue("Phone", agent.Phone);
                Command.Parameters.AddWithValue("ContactPerson", agent.ContactPerson);
                Command.Parameters.AddWithValue("ReferredBy", agent.ReferredBy);
                Command.Parameters.AddWithValue("Logo", agent.Logo);
                Command.Parameters.AddWithValue("Status", agent.Status);
                Command.Parameters.AddWithValue("Balance", agent.Balance);
                Command.Parameters.AddWithValue("LoginUrl", agent.LoginUrl);
                Command.Parameters.AddWithValue("SecurityCode", agent.SecurityCode);
                Command.Parameters.AddWithValue("SMTPPort", agent.SMTPPort);
                Command.Parameters.AddWithValue("CurrentBalance", agent.CurrentBalance);

                Command.Parameters.AddWithValue("@Action", "Update");

                i = Command.ExecuteNonQuery();

            }

            return i;

        }

        //Method for Deleting an Employee

        public int Delete(int ID)

        {

            int i;

            {

                Connection.Open();
                Command = new SqlCommand("DeleteBusinessEntities", Connection);
                Command.CommandType = CommandType.StoredProcedure;

                Command.Parameters.AddWithValue("@Id", ID);

                i = Command.ExecuteNonQuery();

            }

            return i;

        }
    }
}