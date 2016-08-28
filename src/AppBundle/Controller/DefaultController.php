<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Link;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', []);
    }

    /**
     * @Route("/jump/{code}", name="jump")
     */
    public function jumpAction($code='', Request $request)
    {
        if($code)
        {
            $em = $this->getDoctrine()->getManager();
            $link = $em->getRepository('AppBundle:Link')
                    ->findOneByCode($code);
            if(is_object($link) && $link instanceof Link)
            {
                $link->setCounter( $link->getCounter() + 1 );
                $em->flush();
                return $this->redirect($link->getUrl());
            }
            else
            {
                return $this->redirectToRoute('homepage', array('from' => 'jump_not_link'));
            }
        }
        else
        {
            return $this->redirectToRoute('homepage', array('from' => 'jump'));
        }
    }
}
