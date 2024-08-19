import { $host } from '.';


class newsletterSubscriptionReq {
   createSubscription = async (email: string) => {
      const { data } = await $host.post<{message:string}>('/newsletter-subscription' ,{ email});
      return data;
   };

}

export default new newsletterSubscriptionReq();
