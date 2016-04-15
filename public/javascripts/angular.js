
var app = angular.module("Phonebook", ['ui.bootstrap.modal']);
var PHONE_REGEXP = /^[(]{0,3}[0-9]{4}[)\.\- ]{0,1}[\-]{1}[\.\- ]{0,1}[0-9]{7}$/;

app.controller("phoneController",

	function ($scope, $modal, $http) {
		
        $scope.editingContact = {};
        $scope.contacts = [];
        $scope.arrayIndex = 0;
        $scope.contactNoField = "";
        $scope.statusInfo = "";
        // create contact
        $scope.create = function() {
             $scope.statusInfo = "";
            $scope.eAction = "add";
            $scope.contactNoField = "";
            $scope.clearInput();           
        };  
        
        // show single contact 
        $scope.show = function (contact) {            
           $scope.eAction = "show";         
          
            var index = $scope.contacts.indexOf(contact);     
              
            $http.get('/contact/'+index).
                success(function(data) {      
                    var contact = $scope.contacts[data.id];                                  
                    $scope.editingContact = { contactName : contact.name, contactNo:contact.cellno };
                }
            );
        };

        // store contact 
        $scope.store = function () {    
          
           var value = $scope.editingContact.contactNo;
           $scope.contactNoField = "";
          
           if( !$scope.validatePhonenumber(value) )  return false;          

            $http.post('/contact/store', $scope.editingContact).
                success(function(data) {                              
                  $scope.contacts.push(
                    {
                      name: data.contactName,
                      cellno: data.contactNo
                    }
                  );
                  $scope.statusInfo = "add";
                  $scope.clearInput();
                }
            );

        };

        // Get Total Items
        $scope.getTotalItems = function () {
            return $scope.contacts.length;
        };
          
        // Delete contact
        $scope.delete = function (idx) { 

            var index = $scope.contacts.indexOf(idx);             
            $http.delete('/contact/'+index).
                  success(function(data) {   
                    $scope.contacts.splice(data.id, 1);                       
                  }
            );

        }; 

        // Edit contact  
        $scope.edit = function(contact){

          $scope.statusInfo = "";
          $scope.contactNoField = "";
          $scope.eAction = "edit";     
          $scope.arrayIndex = $scope.contacts.indexOf(contact);         
          $scope.editingContact ={  contactName: contact.name, contactNo: contact.cellno };       
         
        }

        // Update contact 
        $scope.update = function(idx, $routeParams){         
          var value = $scope.editingContact.contactNo;
          $scope.contactNoField = ""; 
        
          if( !$scope.validatePhonenumber(value) ) return false;
          

          $http.put('/contact/'+idx, $scope.editingContact).
                success(function(data) {   
                  $scope.contacts.splice(data.id, 1,{
                        name: data.contactName,
                        cellno: data.contactNo
                  });  
                  $scope.statusInfo = "update";
                   
                }
          );

        }  

        // Clear object 
        $scope.clearInput = function(){
            // Clear input fields after push
            $scope.editingContact.contactName = "";
            $scope.editingContact.contactNo = ""; 
        }

        // Validate phone number
        $scope.validatePhonenumber = function(phoneNumber){          

           if(!PHONE_REGEXP.test(phoneNumber)) {

              $scope.contactNoField  = "Error: invalid phone number";              
              $scope.editingContact.contactNo = "";
              return false;
            } 

            return true;

        }   

        // Check if integer
        $scope.isInt = function(value){

            var x;
            if (isNaN(value)) {
                return false;
            } else{ 
              x = parseFloat(value);
              return (x | 0) === x;
            }

        }


       

  }

);

