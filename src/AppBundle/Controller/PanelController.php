<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class PanelController extends Controller
{
    /**
     * @Route("/panel", name="panel")
     */
    public function indexAction(Request $request)
    {
        return $this->render('panel/index.html.twig', ['baseUrl'=>$baseUrl]);
    }
}
