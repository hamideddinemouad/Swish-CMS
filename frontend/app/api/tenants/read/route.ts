//this will call the nestjs api for the required jsons
//it will get subdomain from request headers proxy already sets this up and page accessed
//it will call nestjs to bring out data for the subdomain data will be 3 big objects
//one that has truthy and falsy values for components existing in page
//one to hydrate the components with user related data
//one for styling preferences in tailwind
//this route will be called on the routed to page by proxy
//it will take those objects and decide how to consume them
